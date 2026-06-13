import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Mail, 
  Database,
  Save,
  Lock,
  Loader2
} from "lucide-react";
import { adminServices } from "../../services/admin.services";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("General");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [settings, setSettings] = useState({
    marketplaceName: "THEMAVIA",
    supportEmail: "support@themavia.com",
    commissionRate: 30,
    maintenanceMode: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await adminServices.getSettings();
      if (data && Object.keys(data).length > 0) {
         setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch(err) {
      console.warn('Failed to load remote settings', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await adminServices.updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch(err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { label: "General", icon: Settings },
    { label: "Security", icon: Shield },
    { label: "Notifications", icon: Bell },
    { label: "Localization", icon: Globe },
    { label: "Email Templates", icon: Mail },
    { label: "Database", icon: Database },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Settings</h1>
        <p className="text-app-secondary font-medium mt-2">Configure your marketplace and admin preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Navigation */}
        <div className="space-y-2">
          {tabs.map((item) => (
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 p-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.label 
                  ? "bg-app-primary text-app-surface shadow-lg" 
                  : "text-app-secondary hover:bg-app-surface hover:text-app-primary border border-transparent hover:border-app-border"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border border-app-border bg-app-surface">
              <Loader2 size={48} className="text-app-accent animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary mt-4">Loading Settings...</p>
            </div>
          ) : activeTab === "General" ? (
            <div className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary border-b border-app-border pb-4">General Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Marketplace Name</label>
                  <input 
                    type="text" 
                    value={settings.marketplaceName || ''}
                    onChange={(e) => setSettings({ ...settings, marketplaceName: e.target.value })}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Support Email</label>
                  <input 
                    type="email" 
                    value={settings.supportEmail || ''}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Commission Rate (%)</label>
                  <input 
                    type="number" 
                    value={settings.commissionRate || 0}
                    onChange={(e) => setSettings({ ...settings, commissionRate: parseInt(e.target.value) || 0 })}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Maintenance Mode</label>
                  <div className="flex items-center h-[50px]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-app-bg peer-focus:outline-none border-2 border-app-border rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-app-secondary after:border-app-border after:border after:rounded-none after:h-4 after:w-4 after:transition-all peer-checked:bg-app-primary peer-checked:after:bg-app-surface"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-3 bg-app-primary text-app-surface px-8 py-4 rounded-none font-black uppercase text-xs tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                {saveSuccess && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-app-success">Saved Successfully!</span>
                )}
              </div>
            </div>
          ) : activeTab === "Security" ? (
            <div className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary border-b border-app-border pb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-app-bg border border-app-border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-app-surface text-app-primary">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight text-app-primary">Two-Factor Authentication</p>
                      <p className="text-[10px] font-medium text-app-secondary">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-app-accent hover:underline">Enable</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-app-bg border border-app-border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-app-surface text-app-primary">
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight text-app-primary">IP Whitelisting</p>
                      <p className="text-[10px] font-medium text-app-secondary">Restrict admin access to specific IP addresses.</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-app-accent hover:underline">Configure</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <Settings size={48} className="mx-auto text-app-border" strokeWidth={1} />
                <div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-app-primary">{activeTab}</h3>
                  <p className="text-sm font-medium text-app-secondary mt-2">This configuration module is currently under development.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
