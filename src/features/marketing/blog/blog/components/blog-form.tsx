"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { useCreateBlogMutation } from "../queries/use-blog";
import { BlogSchema } from "../schemas/blog.schema";

export default function BlogForm() {
  // export default function TrainAtHomeForm() {
  const mutation = useCreateBlogMutation();
  const { form, resetAll, submitErrors } = useZodTanstackForm({
    defaultValues: {
      title: "",
      content: "",
    },
    schema: BlogSchema,
    mutation,

    // ✅ optional field label map
    fieldLabels: {
      title: "Title",
      content: "Content",
    },
  });

  return (
    <div className="min-h-screen bg-white-100 md:py-10 py-4 md:px-4 z-10 relative">
      <form
        id="blog-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <FieldGroup>
          <Card>
            <CardHeader>
              <CardTitle>Blog Form</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* 1. Title */}
              <form.Field name="title">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Title *">
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="Enter blog title"
                        autoComplete="name"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              {/* 2. Content */}
              <form.Field name="content">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Content *">
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="Enter blog content"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              {/* error */}
              <SubmitErrorSummary errors={submitErrors} />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button type="button" variant="outline" onClick={resetAll}>
                  Reset
                </Button>

                <SubmitButton form="blog-form" isLoading={mutation.isPending}>
                  Submit
                </SubmitButton>
              </div>
            </CardFooter>
          </Card>
        </FieldGroup>
      </form>
    </div>
  );
}
