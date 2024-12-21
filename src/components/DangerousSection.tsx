import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import React, { useState } from "react"

export default function DangerousSection({
  param,
  deleteFn,
  triggerButtonName,
  confirmKey = "Delete it for me!",
}: Readonly<{
  param: string
  deleteFn: (param: string) => Promise<{ message: string }>
  triggerButtonName: string
  confirmKey?: string
}>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [confirmText, setConfirmText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  async function onDelete() {
    setSubmitting(true)
    const result = await deleteFn(param)
    setSubmitting(false)
    if (result?.message) alert(result?.message)
  }
  return (
    <div className="mt-12">
      <Divider />
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Khu vực nguy hiểm"
        >
          <Button onPress={onOpen} color="danger">
            {triggerButtonName}
          </Button>
          <Modal
            isOpen={isOpen}
            placement="top-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-danger-500">
                    Hành động này sẽ không thể phục hồi!
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Nhập <b>&quot;{confirmKey}&quot;</b> để xác nhận xóa
                    </p>
                    <Input
                      label="Xác nhận"
                      placeholder=""
                      variant="bordered"
                      value={confirmText}
                      onValueChange={(value) => {
                        setConfirmText(value)
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={onClose}
                      isDisabled={submitting}
                    >
                      Hủy
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        onDelete()
                      }}
                      isLoading={submitting}
                      isDisabled={confirmText != confirmKey || submitting}
                    >
                      Xóa
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
