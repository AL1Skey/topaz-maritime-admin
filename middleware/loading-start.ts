import { useAppStore } from "@/stores/index";

export default defineNuxtRouteMiddleware(() => {
  const store = useAppStore();

  store.loadingStart()
  console.log('loading start...')
})