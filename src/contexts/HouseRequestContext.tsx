import { createContext, useContext, useState, ReactNode } from "react";

interface HouseRequest {
  id: string;
  status: string;
  property?: {
    title?: string;
    id?: string;
  };
  user?: {
    fullName?: string;
    id?: string;
  };
  message?: string;
  createdAt?: string;
  [key: string]: any;
}

interface HouseRequestContextType {
  requests: HouseRequest[];
  isLoading: boolean;
  error: string;
  success: string;
  fetchHouseRequests: (token: string) => Promise<void>;
  updateHouseRequest: (
    id: string,
    token: string,
    updateData: any
  ) => Promise<any>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

const HouseRequestContext = createContext<HouseRequestContextType | undefined>(
  undefined
);

const BASE = "https://backend.realestway.com/api";

export function HouseRequestProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<HouseRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchHouseRequests = async (token: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE}/user-requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRequests(data.data || data);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch requests. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHouseRequest = async (
    id: string,
    token: string,
    updateData: any
  ) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${BASE}/user-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error("Failed to update request");

      const updatedRequest = await res.json();
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? updatedRequest.data || updatedRequest : req
        )
      );
      setSuccess("Request updated successfully!");
      return updatedRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HouseRequestContext.Provider
      value={{
        requests,
        isLoading,
        error,
        success,
        fetchHouseRequests,
        updateHouseRequest,
        setError,
        setSuccess,
      }}
    >
      {children}
    </HouseRequestContext.Provider>
  );
}

export function useHouseRequests(): HouseRequestContextType {
  const context = useContext(HouseRequestContext);
  if (context === undefined) {
    throw new Error(
      "useHouseRequests must be used within a HouseRequestProvider"
    );
  }
  return context;
}
