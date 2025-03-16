import { useUserStore } from "@/stores/user"

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();

  if (!userStore.isSuperadmin) {
    console.log('Forbidden!');

    // throw createError({
    //   statusCode: 404
    // })

    return abortNavigation()

    // return abortNavigation(
    //   createError({
    //     statusCode: 404,
    //     message: 'The route could not be found :(',
    //   })
    // );
  }
})