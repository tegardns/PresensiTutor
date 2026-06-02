import { useRef, useState, useEffect, type ChangeEvent } from "react";

import SettingsHeader from "@/features/settings/components/SettingsHeader";
import ProfilePhotoSection from "@/features/settings/components/ProfilePhotoSection";
import PersonalInfoCard from "@/features/settings/components/PersonalInfoCard";
import BankAccountCard from "@/features/settings/components/BankAccountCard";
import ChangePasswordCard from "@/features/settings/components/ChangePasswordCard";
import BankConfirmModal from "@/features/settings/components/BankConfirmModal";
import PasswordModal from "@/features/settings/components/PasswordModal";
import PasswordConfirmModal from "@/features/settings/components/PasswordConfirmModal";
import api from "@/shared/lib/api";
import { useAlertConfirm } from "@/shared/contexts/AlertConfirmContext";

interface SettingsPageProps {
  onBack: () => void;
  tutorProfile: any;
  onProfileUpdate: (updated: any) => void;
}

export default function SettingsPage({ onBack, tutorProfile, onProfileUpdate }: SettingsPageProps) {
  const { showAlert } = useAlertConfirm();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(tutorProfile?.fotoUrl || null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBankConfirm, setShowBankConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [email] = useState(tutorProfile?.email || "");
  const [position] = useState(tutorProfile?.posisi || "Tentor");

  const [fullName, setFullName] = useState(tutorProfile?.nama || "");
  const [whatsapp, setWhatsapp] = useState(tutorProfile?.noWa || "");
  const [address, setAddress] = useState(tutorProfile?.alamat || "");

  const [tempFullName, setTempFullName] = useState(fullName);
  const [tempWhatsapp, setTempWhatsapp] = useState(whatsapp);
  const [tempAddress, setTempAddress] = useState(address);

  const [bankName, setBankName] = useState(tutorProfile?.namaBank || "");
  const [accountNumber, setAccountNumber] = useState(tutorProfile?.noRek || "");

  const [tempBankName, setTempBankName] = useState(bankName);
  const [tempAccountNumber, setTempAccountNumber] = useState(accountNumber);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Sync profile details when tutorProfile updates
  useEffect(() => {
    if (tutorProfile) {
      setFullName(tutorProfile.nama || "");
      setWhatsapp(tutorProfile.noWa || "");
      setAddress(tutorProfile.alamat || "");
      setBankName(tutorProfile.namaBank || "");
      setAccountNumber(tutorProfile.noRek || "");

      setTempFullName(tutorProfile.nama || "");
      setTempWhatsapp(tutorProfile.noWa || "");
      setTempAddress(tutorProfile.alamat || "");
      setTempBankName(tutorProfile.namaBank || "");
      setTempAccountNumber(tutorProfile.noRek || "");
    }
  }, [tutorProfile]);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  async function handleSaveInfo() {
    try {
      const response = await api.put("/tutor/profile", {
        nama: tempFullName,
        noWa: tempWhatsapp,
        alamat: tempAddress,
        namaBank: bankName,
        noRek: accountNumber,
      });

      setFullName(tempFullName);
      setWhatsapp(tempWhatsapp);
      setAddress(tempAddress);
      onProfileUpdate(response.data.data);
      setIsEditingInfo(false);
    } catch (err: any) {
      console.error("Gagal menyimpan info profil:", err);
      showAlert(err.response?.data?.message || "Gagal memperbarui informasi pribadi", "error");
    }
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

  async function handleConfirmBank() {
    try {
      const response = await api.put("/tutor/profile", {
        nama: fullName,
        noWa: whatsapp,
        alamat: address,
        namaBank: tempBankName,
        noRek: tempAccountNumber,
      });

      setBankName(tempBankName);
      setAccountNumber(tempAccountNumber);
      onProfileUpdate(response.data.data);
      setIsEditingBank(false);
      setShowBankConfirm(false);
    } catch (err: any) {
      console.error("Gagal menyimpan rekening bank:", err);
      showAlert(err.response?.data?.message || "Gagal memperbarui rekening bank", "error");
      setShowBankConfirm(false);
    }
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

  function handlePasswordSubmit() {
    if (newPassword !== confirmPassword) {
      showAlert("Konfirmasi password baru tidak cocok.", "error");
      return;
    }
    setShowPasswordConfirm(true);
  }

  async function handleConfirmPasswordChange() {
    try {
      await api.post("/tutor/change-password", {
        oldPassword,
        newPassword,
      });

      setShowPasswordConfirm(false);
      setShowPasswordModal(false);
      resetPasswordForm();

      showAlert("Password berhasil diubah. Silakan masuk kembali dengan password baru.", "success");
      
      // Auto logout
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.reload();
    } catch (err: any) {
      console.error("Gagal mengubah password:", err);
      showAlert(err.response?.data?.message || "Gagal mengubah password. Pastikan password lama benar.", "error");
      setShowPasswordConfirm(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
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
          onSubmit={handlePasswordSubmit}
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