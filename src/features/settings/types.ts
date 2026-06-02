import type { ChangeEvent, RefObject } from "react";

export interface SettingsHeaderProps {
  onBack: () => void;
}

export interface ProfilePhotoSectionProps {
  fullName: string;
  profilePhoto: string | null;
  photoInputRef: RefObject<HTMLInputElement | null>;
  onPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  uploading?: boolean;
}

export interface PersonalInfoCardProps {
  email: string;
  position: string;
  fullName: string;
  whatsapp: string;
  address: string;
  tempFullName: string;
  tempWhatsapp: string;
  tempAddress: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onTempFullNameChange: (value: string) => void;
  onTempWhatsappChange: (value: string) => void;
  onTempAddressChange: (value: string) => void;
}

export interface BankAccountCardProps {
  bankName: string;
  accountNumber: string;
  tempBankName: string;
  tempAccountNumber: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onTempBankNameChange: (value: string) => void;
  onTempAccountNumberChange: (value: string) => void;
}

export interface ChangePasswordCardProps {
  onOpenPasswordModal: () => void;
}

export interface BankConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export interface PasswordModalProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  onOldPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export interface PasswordConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}