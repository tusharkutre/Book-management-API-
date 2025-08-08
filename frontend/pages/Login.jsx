import Forms from "../src/components/Forms";

const Login = () => {
  
  return (
    <>
      <section className="flex relative flex-col items-center justify-center h-screen">
        <h1 className="text-center absolute top-10 text-3xl font-serif">
          Welcome to the BookStore
        </h1>
        <section className="p-4 space-y-6 bg-slate-200 rounded">
          <div className="text-3xl ">
            <h1>Login Page</h1>
          </div>

        {/* Render Form UI here */}
         <Forms/>
        </section>
      </section>
    </>
  );
};

export default Login;
