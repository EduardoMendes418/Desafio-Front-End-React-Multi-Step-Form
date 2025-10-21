import React from 'react';
import { PasswordStrength } from '../../utils/passwordStrength';

interface PasswordStrengthMeterProps {
  passwordStrength: PasswordStrength;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  passwordStrength,
}) => {
  if (passwordStrength.strength === 0) {
    return null;
  }

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
            style={{ width: `${passwordStrength.strength}%` }}
          />
        </div>
        {passwordStrength.label && (
          <p className="text-sm font-medium text-gray-700 mt-1">
            Força: {passwordStrength.label}
          </p>
        )}
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Requisitos:</p>
        <ul className="text-sm space-y-1">
          {passwordStrength.requirements.map((requirement, index) => (
            <li
              key={index}
              className={`flex items-center ${
                requirement.met ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <span className="mr-2">
                {requirement.met ? '✓' : '○'}
              </span>
              {requirement.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};