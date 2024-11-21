import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/Button";
import InputField from "../../components/inputfied";
import Logo from "../../components/Logo";
import { userSchema } from "../../lib";

type UserForm = z.infer<typeof userSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async () => {
    console.log("Helloasdas");
  };

  return (
    <div className="w-full h-screen flex   ">
      <div className="w-7/12 h-screen bg-primary bg-pattern2 opacity-50 " />
      <div className="w-96 h-fit bg-card rounded-md      py-5 px-8 mx-3 self-center relative bottom-16">
        <Link to={"/"}>
          <Logo />
        </Link>
        <p className="mt-2 mb-5">Get started with you second brain.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 h-full"
        >
          <InputField
            label="Username"
            name="username"
            register={register}
            error={errors.username}
            placeholder="Tyler Durden"
          />
          <InputField
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            placeholder="Password"
            type="password"
          />
          <Button text="Sign Up" type="default" onClick={onSubmit} />
        </form>
        <p className="text-sm mt-4 font-medium">
          Already a second brain?{" "}
          <Link
            to={"/sign-in"}
            className="text-primary underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
