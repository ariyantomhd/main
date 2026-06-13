import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { userDashboardService } from "../../../services/userDashboard.service";

export default function UserSetting() {
  const { profile, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.full_name || profile?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      await userDashboardService.updateProfile({ full_name: name });
      if (updateProfile) {
        updateProfile({ full_name: name });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-app-secondary">Manage your account settings and preferences.</p>
      </div>
      
      <div className="bg-app-surface border border-app-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-app-secondary mb-1">Email</label>
            <input 
              type="email" 
              disabled 
              value={profile?.email || ""} 
              className="w-full bg-app-bg border border-app-border rounded-xl px-4 py-2 opacity-70 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-app-secondary mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-app-bg border border-app-border rounded-xl px-4 py-2 focus:ring-1 focus:ring-app-accent focus:border-app-accent outline-none"
            />
          </div>
          <button 
            disabled={loading}
            onClick={handleUpdate}
            className="bg-app-accent text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {success && <p className="text-emerald-500 text-sm mt-2">Profile updated successfully!</p>}
        </div>
      </div>
    </div>
  );
}
