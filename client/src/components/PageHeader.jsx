import React from 'react';
import { FiPlus } from 'react-icons/fi';

const PageHeader = ({ 
  title, 
  subtitle, 
  actionText, 
  actionIcon: ActionIcon = FiPlus,
  onAction,
  actionButtonStyle = "default" // "default", "outline", "primary"
}) => {
  const getButtonClasses = () => {
    switch (actionButtonStyle) {
      case "outline":
        return "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer";
      case "primary":
        return "bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer";
      default:
        return "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer";
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className={`${getButtonClasses()} w-[200px]`}
          >
            <ActionIcon className="w-4 h-4" />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 