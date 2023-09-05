import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export interface QuoteSubmission {
  name: string;
  quote: string;
}

const WATTLES_SCHEMA = object().shape({
  name: string().required(),
  quote: string().required(),
});

const Home: NextPage = () => {
  const getApi = "api/v1/getMeSomeWallace";
  const setApi = "api/v1/setMeSomeWallace";
  const [newQuote, setNewQuote] = useState<string | undefined>(undefined);
  const [submitWisdom, setSubmitWisdom] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<QuoteSubmission>({
    mode: "onChange",
    resolver: yupResolver(WATTLES_SCHEMA),
  });

  console.log({ isGetting });

  const getWallace = async () => {
    setSubmitWisdom(false);
    setIsGetting(true);
    const wallaceQuote = await fetch(getApi)
      .then((res) => res.json())
      .then((res) => res);
    setIsGetting(false);
    setNewQuote(wallaceQuote.quote);
  };

  const submitQuote = async (formValues: QuoteSubmission) => {
    const trimmedValues = {
      name: formValues.name.trim().toLowerCase(),
      quote: formValues.quote.trim(),
    };
    await fetch(setApi, { method: "POST", body: JSON.stringify(trimmedValues) })
      .then(async (res) => {
        if (res.status !== 200) {
          toast.error((await res.json()).message);
          return;
        }
        return res.json();
      })
      .then((res) => {
        toast(`Your quote: '${res.quote}' has been addded`);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <h1 className="flex justify-center text-2xl underline mt-16">
        Welcome to Wallace&apos;s abode
      </h1>
      <div className="flex justify-center items-center flex-col mt-10">
        <button
          className="rounded border border-black w-64 p-4 m-2"
          onClick={getWallace}
        >
          Get formless wisdom
        </button>
        <button
          className="rounded border border-black w-64 p-4"
          onClick={() => {
            setSubmitWisdom(true);
            setNewQuote(undefined);
          }}
        >
          Submit formless wisdom
        </button>
      </div>

      <div className="flex justify-center w-full">
        {isGetting ? (
          <p className="w-full max-w-[500px] text-center p-16">
            ...getting wisdom, please wait
          </p>
        ) : (
          newQuote &&
          !submitWisdom && (
            <p className="w-full max-w-[500px] text-center p-16">{newQuote}</p>
          )
        )}

        {submitWisdom && (
          <form
            onSubmit={handleSubmit(submitQuote)}
            className="flex justif-center flex-col"
          >
            <input
              className="border border-black rounded p-2 mt-2"
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            <textarea
              {...register("quote")}
              className="my-2 border border-black w-64 h-64 rounded p-2"
              placeholder="...Gratitude draws the mind into closer touch with the source from which the blessings come."
            />
            <button
              disabled={!isValid}
              type="submit"
              className="border-black border rounded disabled:cursor-not-allowed disabled:opacity-50 disabled:line-through"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Home;
