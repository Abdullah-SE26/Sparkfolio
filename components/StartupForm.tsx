"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/action";
import { useToast } from "@/hooks/use-toast";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);


  const errorRefs = {
    title: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
    category: useRef<HTMLInputElement>(null),
    link: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set("pitch", pitch);

    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: formData.get("pitch") as string,
      };

      // Validate the form data
      await formSchema.parseAsync(formValues);

      const result = await createPitch(formData);

      if (result.status === "SUCCESS") {
        toast({
          title: "✅ Success",
          description: "Your startup pitch has been created successfully!",
          duration : 4000,
        });

        formRef.current?.reset();
        setPitch("");
        setErrors({});
        router.push(`/startup/${result._id}`);
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Failed to create startup pitch",
          variant: "destructive",
          duration : 4000,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        const formattedErrors: Record<string, string> = {};

        Object.keys(fieldErrors).forEach((key) => {
          const errorArray = fieldErrors[key as keyof typeof fieldErrors];
          if (errorArray && errorArray.length > 0) {
            formattedErrors[key] = errorArray[0];
          }
        });

        setErrors(formattedErrors);

        // Scroll to first error
        const firstErrorKey = Object.keys(formattedErrors)[0];
        const firstErrorRef =
          errorRefs[firstErrorKey as keyof typeof errorRefs];
        if (firstErrorRef?.current) {
          firstErrorRef.current.scrollIntoView({ behavior: "smooth" });
          firstErrorRef.current.focus();
        }

        toast({
          title: "⚠️ Validation Error",
          description: "Please fix the highlighted fields.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "❌ Unexpected Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 mt-10 rounded-xl border border-zinc-200 shadow-md space-y-8"
    >
      <Field id="title" label="Title" error={errors.title}>
        <Input
          id="title"
          name="title"
          ref={errorRefs.title}
          required
          placeholder="Startup Title"
          className="input-style"
        />
      </Field>

      <Field id="description" label="Description" error={errors.description}>
        <Textarea
          id="description"
          name="description"
          ref={errorRefs.description}
          required
          placeholder="Startup Description"
          className="input-style"
        />
      </Field>

      <Field id="category" label="Category" error={errors.category}>
        <Input
          id="category"
          name="category"
          ref={errorRefs.category}
          required
          placeholder="e.g. Tech, Health, Education..."
          className="input-style"
        />
      </Field>

      <Field id="link" label="Image URL" error={errors.link}>
        <Input
          id="link"
          name="link"
          ref={errorRefs.link}
          required
          placeholder="Startup Image URL"
          className="input-style"
        />
      </Field>

      <Field id="pitch" label="Pitch" error={errors.pitch}>
        <div data-color-mode="light">
          <MDEditor
            value={pitch}
            onChange={(val) => setPitch(val || "")}
            id="pitch"
            preview="edit"
            height={300}
            style={{
              borderRadius: 16,
              border: "1px solid #ccc",
              overflow: "hidden",
            }}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        </div>
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-blue-950 border-[3px] border-black rounded-full min-h-[70px] w-full font-bold text-lg text-white flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin size-5" /> Submitting...
          </>
        ) : (
          <>
            Submit Your Pitch <Send className="size-5" />
          </>
        )}
      </Button>
    </form>
  );
};

const Field = ({
  id,
  label,
  children,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-lg text-black font-semibold uppercase">
      {label}
    </label>
    {children}
    {error && <p className="text-red-600 text-sm ml-2">{error}</p>}
  </div>
);

export default StartupForm;
