'use client';

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number;
  affiliateId?: string | null;
  onSuccess: () => void;
}

export default function PayPalButton({
  amount,
  affiliateId,
  onSuccess,
}: PayPalButtonProps) {
  const [error, setError] = useState<string | null>(null);

  // Client ID PayPal diambil dari .env.local (default pake 'test' untuk sandbox mode)
  const paypalClientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <PayPalScriptProvider
        options={{
          clientId: paypalClientId,
          currency: 'USD',
          intent: 'capture',
        }}
      >
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: amount.toFixed(2),
                  },
                  description: 'Digital Order Checkout - TMV Hub',
                  custom_id: affiliateId || undefined,
                },
              ],
            });
          }}
          onApprove={async (_data, actions) => {
            if (actions.order) {
              try {
                const details = await actions.order.capture();
                console.log('Payment successful:', details);
                onSuccess();
              } catch (err) {
                console.error('Error capturing PayPal order:', err);
                setError('Gagal memproses pembayaran. Silakan coba lagi.');
              }
            }
          }}
          onError={(err) => {
            console.error('PayPal Checkout Error:', err);
            setError('Terjadi kesalahan pada tombol PayPal. Silakan muat ulang halaman.');
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}