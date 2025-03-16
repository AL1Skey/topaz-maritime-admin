import { useAppStore } from "@/stores/index";

export default defineNuxtRouteMiddleware(() => {
  const store = useAppStore();

  store.loadingEnd()
  console.log('loading end...')
})