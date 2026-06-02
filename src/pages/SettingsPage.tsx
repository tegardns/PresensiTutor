import { useRef, useState, type ChangeEvent } from "react";

import SettingsHeader from "@/features/settings/components/SettingsHeader";
import ProfilePhotoSection from "@/features/settings/components/ProfilePhotoSection";
import PersonalInfoCard from "@/features/settings/components/PersonalInfoCard";
import BankAccountCard from "@/features/settings/components/BankAccountCard";
import ChangePasswordCard from "@/features/settings/components/ChangePasswordCard";
import BankConfirmModal from "@/features/settings/components/BankConfirmModal";
import PasswordModal from "@/features/settings/components/PasswordModal";
import PasswordConfirmModal from "@/features/settings/components/PasswordConfirmModal";

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBankConfirm, setShowBankConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [email] = useState("mellysa.tutor@example.com");
  const [position] = useState("Tentor Matematika & Fisika");

  const [fullName, setFullName] = useState("Mellysa");
  const [whatsapp, setWhatsapp] = useState("081234567890");
  const [address, setAddress] = useState("Jl. Merdeka No. 123, Jakarta");

  const [tempFullName, setTempFullName] = useState(fullName);
  const [tempWhatsapp, setTempWhatsapp] = useState(whatsapp);
  const [tempAddress, setTempAddress] = useState(address);

  const [bankName, setBankName] = useState("BCA");
  const [accountNumber, setAccountNumber] = useState("1234567890");

  const [tempBankName, setTempBankName] = useState(bankName);
  const [tempAccountNumber, setTempAccountNumber] = useState(accountNumber);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleSaveInfo() {
    setFullName(tempFullName);
    setWhatsapp(tempWhatsapp);
    setAddress(tempAddress);
    setIsEditingInfo(false);
  }

  function handleCancelInfo() {
    setTempFullName(fullName);
    setTempWhatsapp(whatsapp);
    setTempAddress(address);
    setIsEditingInfo(false);
  }

  function handleSaveBank() {
    setShowBankConfirm(true);
  }

  function handleConfirmBank() {
    setBankName(tempBankName);
    setAccountNumber(tempAccountNumber);
    setIsEditingBank(false);
    setShowBankConfirm(false);
  }

  function handleCancelBank() {
    setTempBankName(bankName);
    setTempAccountNumber(accountNumber);
    setIsEditingBank(false);
  }

  function resetPasswordForm() {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  function handleClosePasswordModal() {
    setShowPasswordModal(false);
    resetPasswordForm();
  }

  function handleConfirmPasswordChange() {
    setShowPasswordConfirm(false);
    setShowPasswordModal(false);
    resetPasswordForm();

    alert("Password berhasil diubah. Silakan login kembali.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader onBack={onBack} />

      <div className="px-5 py-6 space-y-5 pb-24">
        <ProfilePhotoSection
          fullName={fullName}
          profilePhoto={profilePhoto}
          photoInputRef={photoInputRef}
          onPhotoChange={handlePhotoChange}
        />

        <PersonalInfoCard
          email={email}
          position={position}
          fullName={fullName}
          whatsapp={whatsapp}
          address={address}
          tempFullName={tempFullName}
          tempWhatsapp={tempWhatsapp}
          tempAddress={tempAddress}
          isEditing={isEditingInfo}
          onEdit={() => setIsEditingInfo(true)}
          onCancel={handleCancelInfo}
          onSave={handleSaveInfo}
          onTempFullNameChange={setTempFullName}
          onTempWhatsappChange={setTempWhatsapp}
          onTempAddressChange={setTempAddress}
        />

        <BankAccountCard
          bankName={bankName}
          accountNumber={accountNumber}
          tempBankName={tempBankName}
          tempAccountNumber={tempAccountNumber}
          isEditing={isEditingBank}
          onEdit={() => setIsEditingBank(true)}
          onCancel={handleCancelBank}
          onSave={handleSaveBank}
          onTempBankNameChange={setTempBankName}
          onTempAccountNumberChange={setTempAccountNumber}
        />

        <ChangePasswordCard onOpenPasswordModal={() => setShowPasswordModal(true)} />
      </div>

      {showBankConfirm && (
        <BankConfirmModal
          onCancel={() => setShowBankConfirm(false)}
          onConfirm={handleConfirmBank}
        />
      )}

      {showPasswordModal && (
        <PasswordModal
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onOldPasswordChange={setOldPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onClose={handleClosePasswordModal}
          onSubmit={() => setShowPasswordConfirm(true)}
        />
      )}

      {showPasswordConfirm && (
        <PasswordConfirmModal
          onCancel={() => setShowPasswordConfirm(false)}
          onConfirm={handleConfirmPasswordChange}
        />
      )}
    </div>
  );
}