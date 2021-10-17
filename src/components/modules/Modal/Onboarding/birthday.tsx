import Button from "components/elements/Button";
import Select from "components/elements/Form/select";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";
import { IntroSectionProps } from "./intro";
import { DATE_DICT, MONTH_DICT, YEAR_DICT } from "./utils";

const BirthdaySection: React.FC<IntroSectionProps> = ({ setProgress }) => {
  const { updateUser } = useAuth();

  return (
    <Formik
      initialValues={{ date: "25", month: "2", year: "2000" }}
      validate={(values) => {
        const errors = {};

        if (!values.date) {
          // @ts-ignore
          errors.date = "Required";
        }

        if (!values.month) {
          // @ts-ignore
          errors.month = "Required";
        }

        if (!values.year) {
          // @ts-ignore
          errors.year = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        updateUser({
          birthdate: new Date(`${values.month}-${values.date}-${values.year}`),
        });
        setSubmitting(false);
        setProgress(3);
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
            <p className="text-lg">Kapan tanggal lahirmu?</p>
            <div className="flex justify-around">
              <div className="mr-2 w-full">
                <Select
                  option={DATE_DICT()}
                  name="date"
                  label="Hari"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date}
                />
              </div>
              <div className="mr-2 w-full">
                <Select
                  option={MONTH_DICT}
                  name="month"
                  label="Bulan"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.month}
                />
              </div>
              <div className=" w-full">
                <Select
                  option={YEAR_DICT()}
                  name="year"
                  label="Tahun"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.year}
                />
              </div>
            </div>
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

export default BirthdaySection;
