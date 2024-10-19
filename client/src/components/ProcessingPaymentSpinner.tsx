const ProcessingPaymentSpinner = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
			<div className='relative mb-4'>
				<div className='w-20 h-20 border-emerald-200 border-2 rounded-full' />
				<div className='w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0' />
			</div>
			<p className='text-white text-lg'>Don't refresh the page, we are processing your payment...</p>
		</div>
	);
};

export default ProcessingPaymentSpinner;