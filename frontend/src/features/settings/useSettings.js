import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsApi } from "../../services/apiSettings";

export const useSettings = () => {
  const {
    isLoading: isLoadingSettings,
    error: errorGetSettings,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettingsApi(),
  });
  return {
    isLoadingSettings,
    errorGetSettings,
    settings,
  };
};
