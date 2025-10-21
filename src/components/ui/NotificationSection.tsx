import React from "react";
import { NOTIFICATION_OPTIONS } from "../../constants/preferences";
import { FieldErrors } from "react-hook-form";
import { PreferencesFormData } from "../../types/preferences";

interface NotificationSectionProps {
  register: any;
  errors: FieldErrors<PreferencesFormData>;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({
  register,
  errors,
  notifications,
}) => {
  const hasNotificationSelected =
    notifications.email || notifications.sms || notifications.push;

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Notificações
        <span className="text-red-500 ml-1">*</span>
      </h3>
      <div className="space-y-3">
        {NOTIFICATION_OPTIONS.map((notification) => (
          <label key={notification.key} className="flex items-center">
            <input
              type="checkbox"
              {...register(`notifications.${notification.key}`)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{notification.label}</span>
          </label>
        ))}
      </div>

      {errors.notifications && typeof errors.notifications === "object" && (
        <p className="text-sm text-red-600 mt-2 flex items-center">
          <span className="mr-1">⚠</span>
          {errors.notifications.message}
        </p>
      )}

      {!hasNotificationSelected && !errors.notifications && (
        <p className="text-sm text-red-500 mt-2">
           <span className="mr-1">⚠</span>
          Selecione pelo menos um tipo de notificação
        </p>
      )}
    </div>
  );
};
