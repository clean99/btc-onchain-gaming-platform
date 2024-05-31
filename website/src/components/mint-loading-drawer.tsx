import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface MintLoadingDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string | React.ReactNode;
  isMinting: boolean;
}

export const MintLoadingDrawer: React.FC<MintLoadingDrawerProps> = ({
    isOpen,
    onOpenChange,
    title,
    description,
    isMinting,
}) => {
  return (
    <>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton >
        <ModalContent className="bg-black text-white border-white border-1 rounded-lg">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2">
                {title}
              </ModalHeader>
              <ModalBody>
                {description}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose} isLoading={isMinting} className="bg-black text-white">
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
