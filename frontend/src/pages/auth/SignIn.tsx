import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "../../components/Button";
import InputField from "../../components/Inputfied";
import Logo from "../../components/Logo";
import { userSchema } from "../../lib";
import { signIn } from "../../services/authServices";

type UserForm = z.infer<typeof userSchema>;
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setLoading(true);
    try {
      const response = await signIn(values);
      // console.log(response.data);

      toast.success(response?.data?.message);
      localStorage.setItem("brainly-token", response.data.token);
      navigate("/u");
    } catch (error) {
      toast.error(
        // @ts-ignore
        error?.response?.data?.message || "Error occured while siging up"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex   ">
      <div className="w-7/12 h-screen bg-primary bg-pattern2 opacity-50 " />

      <div className="w-96 h-fit bg-card rounded-md      py-5 px-8 mx-3 self-center relative bottom-16">
        <Link to={"/"}>
          <Logo />
        </Link>
        <p className="mt-2 mb-5">Access your second brain.</p>

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
          <Button
            text="Sign In"
            type="default"
            action="submit"
            loading={loading}
          />
        </form>
        <p className="text-sm mt-4 font-medium">
          Don't have a second brain?{" "}
          <Link
            to={"/sign-up"}
            className="text-primary underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
