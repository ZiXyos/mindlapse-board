import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateProductDTO } from "@mindboard/shared";


export const useAuth = () => {
  const clientQuery = useQueryClient();

  const loginMutation = useMutation({
      onSuccess: async (res) => {
        console.log('user logged in')
      },
      onError: (err: Error) => console.error(err)
  })
}
