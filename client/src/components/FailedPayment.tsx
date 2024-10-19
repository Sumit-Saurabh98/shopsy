const FailedPayment = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
			<p className='text-red-500 text-lg mb-4'>Payment Failed</p>
			<p className='text-white text-lg'>
				If the amount was deducted from your account, we will refund it within 24 hours.
			</p>
		</div>
	);
};

export default FailedPayment;