import { InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Message = ({ type = 'info', text }) => {
  const variants = {
    info: {
      icon: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    error: {
      icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
      bg: 'bg-red-50',
      text: 'text-red-700'
    },
    success: {
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      bg: 'bg-green-50',
      text: 'text-green-700'
    },
    loading: {
      icon: (
        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ),
      bg: 'bg-gray-50',
      text: 'text-gray-700'
    }
  };

  return (
    <div className={`rounded-md p-4 ${variants[type].bg}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {variants[type].icon}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${variants[type].text}`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;