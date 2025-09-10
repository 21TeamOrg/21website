import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { entrance, feedback, loader } from "@/lib/motion";
import { NeonButton } from "./NeonButton";
import useConfetti from "@/lib/useConfetti";

const joinSchema = z.object({
  gamerTag: z.string().min(2, "Enter your gamer tag"),
  platform: z.string().min(1, "Select a platform"),
  region: z.string().min(1, "Select a region"),
  role: z.string().min(1, "Select a role"),
  experience: z.string().min(1, "Select experience"),
});

type JoinFormData = z.infer<typeof joinSchema>;

const steps = [
  {
    label: "Gamer Tag",
    field: "gamerTag",
    placeholder: "Enter your gamer tag",
  },
  {
    label: "Platform",
    field: "platform",
    options: ["PC", "Xbox", "PlayStation", "Switch"],
  },
  { label: "Region", field: "region", options: ["NA", "EU", "APAC", "Other"] },
  { label: "Role", field: "role", options: ["DPS", "Support", "Tank", "Flex"] },
  {
    label: "Experience",
    field: "experience",
    options: ["Casual", "Competitive", "Pro"],
  },
];

export const JoinTheSquad: React.FC = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const confetti = useConfetti(success);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
    mode: "onTouched",
  });

  const onNext = async () => {
    const valid = await trigger(steps[step].field as keyof JoinFormData);
    if (valid) setStep((s) => s + 1);
  };
  const onBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: JoinFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    // TODO: POST to /api/join
  };

  return (
    <section
      id="join"
      className="relative py-24 bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden"
    >
      {confetti}
      <motion.div
        className="max-w-lg mx-auto flex flex-col items-center gap-8"
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-display font-bold text-neon-cyan mb-4 drop-shadow-neon text-center">
          Join the Squad
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-glass-gradient rounded-2xl shadow-glass p-8 flex flex-col gap-6"
        >
          {/* Stepper */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 h-2 mx-1 rounded-full ${
                  i <= step ? "bg-neon-cyan" : "bg-slate-800"
                }`}
              ></div>
            ))}
          </div>
          {/* Step Content */}
          {steps.map((s, i) => (
            <div key={s.field} className={i === step ? "" : "hidden"}>
              <label className="block text-neon-cyan font-bold mb-2">
                {s.label}
              </label>
              {s.options ? (
                <Controller
                  name={s.field as keyof JoinFormData}
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-3 rounded-xl bg-slate-900/80 border border-neon-cyan/30 text-white focus:ring-2 focus:ring-neon-cyan"
                    >
                      <option value="">Select...</option>
                      {s.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                />
              ) : (
                <Controller
                  name={s.field as keyof JoinFormData}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder={s.placeholder}
                      className="w-full p-3 rounded-xl bg-slate-900/80 border border-neon-cyan/30 text-white focus:ring-2 focus:ring-neon-cyan"
                    />
                  )}
                />
              )}
              {errors[s.field as keyof JoinFormData] && (
                <motion.div
                  variants={feedback}
                  initial="hidden"
                  animate="visible"
                  className="text-pink-400 text-sm mt-1"
                >
                  {errors[s.field as keyof JoinFormData]?.message as string}
                </motion.div>
              )}
            </div>
          ))}
          {/* Navigation */}
          <div className="flex justify-between mt-4">
            <NeonButton
              as="button"
              type="button"
              onClick={onBack}
              disabled={step === 0}
            >
              Back
            </NeonButton>
            {step < steps.length - 1 ? (
              <NeonButton as="button" type="button" onClick={onNext}>
                Next
              </NeonButton>
            ) : (
              <NeonButton as="button" type="submit" disabled={loading}>
                {loading ? "Joining..." : "Submit"}
              </NeonButton>
            )}
          </div>
          {/* Loader */}
          {loading && (
            <motion.div
              variants={loader}
              initial="initial"
              animate="animate"
              className="h-2 bg-neon-cyan rounded-full mt-4"
            />
          )}
          {/* Success */}
          {success && (
            <motion.div
              variants={feedback}
              initial="hidden"
              animate="visible"
              className="text-center mt-6"
            >
              <div className="text-2xl text-neon-cyan font-bold mb-2">
                Welcome to Team 21!
              </div>
              <div className="text-white mb-4">
                Check your email for next steps. Join our{" "}
                <a
                  href="https://discord.gg/CNPSjuhw"
                  className="underline text-neon-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>{" "}
                or{" "}
                <a href="#" className="underline text-neon-pink">
                  book a tryout
                </a>
                .
              </div>
              {/* TODO: Confetti animation */}
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
};
