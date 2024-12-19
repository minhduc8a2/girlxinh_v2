import DangerousSection from "@/components/DangerousSection"
import { deleteTopic } from "@/serverActions/topics"
import { TopicType } from "@/types/topics.types"
import { MutateTopicSchema } from "@/zod/MutateTopicSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input, Switch, Button } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { FaCrown } from "react-icons/fa"
const TiptapEditor = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
  loading: () => <p>Editor loading...</p>,
})
export default function MutateTopic(
  props: Readonly<{
    initialTopic?: string
    onSubmit: (
      data: TopicType,
      setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
      _id?: string
    ) => Promise<void>
  }>
) {
  let initialTopic: TopicType | undefined
  if (props.initialTopic) {
    initialTopic = JSON.parse(props.initialTopic)
  }
  //submitting
  const [submitting, setSubmitting] = useState(false)
  const {
    control,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TopicType>({
    defaultValues: {
      name: initialTopic?.name ?? "",
      description: initialTopic?.description ?? "",
      isPrivate: initialTopic?.isPrivate || false,
    },
    resolver: zodResolver(MutateTopicSchema),
  })

  const onSubmit: SubmitHandler<TopicType> = async (data) => {
    await props.onSubmit(data, setSubmitting, initialTopic?._id?.toString())
  }

  return (
    <div className="mt-12 flex justify-center">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          {initialTopic ? "Cập nhật chủ đề" : "Tạo chủ đề"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 grid gap-6">
          {/* Title Input */}
          <div>
            <Input
              {...register("name")}
              label="Họ và tên"
              type="text"
              labelPlacement="outside"
              defaultValue={initialTopic?.name ?? ""}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              isDisabled={submitting}
            />
          </div>

          {/* TiptapEditor - Mô tả */}
          <div>
            <h3 className="text-sm mb-2">Mô tả</h3>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  isDisabled={submitting}
                  initialContent={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          {/* VIP Topic Switch */}
          <div>
            <Controller
              name="isPrivate"
              control={control}
              render={({ field }) => (
                <Switch
                  isSelected={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  aria-label="Is VIP Post"
                  isDisabled={submitting}
                >
                  <div className="flex items-center gap-x-2">
                    Chủ đề VIP <FaCrown className="text-yellow-500" />
                  </div>
                </Switch>
              )}
            />
          </div>
          {/* Submit Button */}
          <Button
            color="primary"
            type="submit"
            isDisabled={submitting}
            isLoading={submitting}
          >
            {initialTopic ? "Cập nhật" : "Tạo chủ đề"}
          </Button>
        </form>
        {!!initialTopic && (
          <DangerousSection
            param={initialTopic.param}
            deleteFn={deleteTopic}
            triggerButtonName="Xóa chủ đề"
          />
        )}
      </div>
    </div>
  )
}
