const ForgotPassword = () => {
  return (
    <div className="bg-gradient-to-b from-green-500 min-h-screen to-blue-800 py-10 items-center justify-center flex">
      <div className="sm:w-[30%] w-[90%]">
        <h2 className="my-2 text-white text-lg mb-2 font-semibold">
          Password Reset
        </h2>
        <div className="rounded-2xl bg-white p-3 w-full pt-8">
          <form className="m-5/6 flex-col justify-center items-center m-auto mb-20">
            <input
              type="Email"
              placeholder="Email"
              className="w-[95%] border-b border-gray-400 p-2 my-2"
            />

            <button className="w-[95%] bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
