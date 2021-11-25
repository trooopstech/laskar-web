import Button from "components/elements/Button";
import useAuth from "hooks/useAuth";
import GoogleLogin from "react-google-login";
import google from "assets/google.svg";

const GoogleSection = ({ text }: { text: string }) => {
  const { googleLogin } = useAuth();

  const onGoogleSuccess = (res: any) => {
    googleLogin(res.tokenId, () => console.log("login with google"));
  };

  const onGoogleFailure = (res: any) => {
    console.log(res);
  };

  return (
    <div className="w-full mt-2">
      <Button
        href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&client_id=506977849517-fvc0hj08fnl57fqnalo87kncquqjn930.apps.googleusercontent.com&scope=profile%20email%20openid&redirect_uri=https://trooops.id"
        external
        className="w-full flex items-center justify-center bg-gray-900 py-2"
      >
        <div className="flex items-center justify-center">
          <img src={google} alt="google-logo" className="mr-4" />
          {text}
        </div>
      </Button>
      <div className="w-full items-center flex justify-center mt-2">
        <div className="bg-white w-full" style={{ height: "1px" }} />
        <p className="mx-2">atau</p>
        <div className="bg-white w-full" style={{ height: "1px" }} />
      </div>
    </div>
  );
};

export default GoogleSection;
