import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";

export interface IntroSectionProps {
  setProgress: (progress: number) => void;
}
const IntroSection: React.FC<IntroSectionProps> = ({ setProgress }) => {
  const [gender, setGender] = useState<"MALE" | "FEMALE">();
  const { updateUser } = useAuth();

  return (
    <Formik
      initialValues={{ phone_number: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.phone_number) {
          // @ts-ignore
          errors.phone_number = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        if (gender !== "MALE" && gender !== "FEMALE") {
          alert("gender belum dipilih");
        } else {
          await updateUser({
            phone_number: values.phone_number.toString(),
            gender,
          });
          setSubmitting(false);
          setProgress(2);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="container flex flex-col items-center justify-center md:w-120"
        >
          <div className="w-full px-4 pt-2 py-4">
            <p className="text-lg">Tentang Kamu!</p>
            <div className="flex flex-col my-2 w-full">
              <span className="font-bold mb-1">Jenis Kelamin</span>
              <div className="w-full flex">
                <div
                  className={`rounded-lg ${
                    gender === "MALE" ? "border-green-400" : "border-gray-500"
                  } cursor-pointer bg-gray-700 border p-2 mr-4 w-full flex items-center`}
                  onClick={() => setGender("MALE")}
                >
                  <BiMaleSign className="font-bold text-xl mr-2 text-blue-400" />
                  <p className="">Laki-Laki</p>
                </div>
                <div
                  className={`rounded-lg ${
                    gender === "FEMALE" ? "border-green-400" : "border-gray-500"
                  } cursor-pointer bg-gray-700 border p-2 w-full flex items-center`}
                  onClick={() => setGender("FEMALE")}
                >
                  <BiFemaleSign className="font-bold text-xl mr-2 text-red-400" />
                  <p className="">Perempuan</p>
                </div>
              </div>
            </div>
            <Input
              type="number"
              label="Nomor Telepon"
              placeholder="8211234567"
              name="phone_number"
              onChange={handleChange}
              onBlur={handleBlur}
              startAddorment={<p className="font-bold">+62</p>}
              value={values.phone_number}
              error={errors.phone_number}
            />
          </div>
          <div className="w-full p-4 bg-gray-700">
            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Selanjutnya
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default IntroSection;
