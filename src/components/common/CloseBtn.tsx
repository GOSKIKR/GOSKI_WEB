const CloseBtn = () => {
  return (
    <div className="absolute top-0 right-0 p-4">
      <button className="text-gray-500 hover:text-gray-900">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CloseBtn;
