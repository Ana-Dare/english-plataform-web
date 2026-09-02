/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  photoUrl: string | null;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  updatePhoto: (photoUrl: string | null) => void;
}

const defaultProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  description: "",
  photoUrl: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const updatePhoto = (photoUrl: string | null) => {
    setProfile((prev) => ({ ...prev, photoUrl }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updatePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
