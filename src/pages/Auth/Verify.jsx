const Verify = () => {
  return (
    <div className="bg-gradient-to-b from-green-500 min-h-screen to-blue-800 py-10 items-center justify-center flex">
      <div className="sm:w-[30%] w-[90%]">
        <h2 className="my-2 text-white text-lg mb-2 font-semibold">
          Verify Account
        </h2>
        <div className="rounded-2xl bg-white p-3 w-full pt-8">
          <p className="text-lg py-2">VERIFY MOBILE NUMBER</p>
          <p className="text-gray-500">
            OTP has been sent to your mobile number, kindly enter it below
          </p>
          <form className="m-5/6 flex-col justify-center items-center m-auto mb-3">
            <input
              type="Email"
              placeholder="Email"
              className="w-[95%] border-b border-gray-400 p-2 my-2"
            />
          </form>
          <p className="flex justify-center text-gray-500 py-3">
            Didn`t recieve code?
          </p>
          <div className="flex justify-around mb-20">
            <button className="bg-green-400 px-2 w-[43%] py-1 rounded-xl text-white">
              Resend in {30}s
            </button>
            <button className="bg-blue-400 px-2 py-1 w-[43%] rounded-xl text-white">
              Change Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
