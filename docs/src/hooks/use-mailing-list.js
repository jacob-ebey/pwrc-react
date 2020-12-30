import { useCallback, useState } from "react";
import fetch from "cross-fetch";

const genaricError = "something went wrong";

function useMailingList() {
  const [state, setState] = useState({});

  const signup = useCallback(
    (email, callback) => {
      if (state.loading) {
        return;
      }

      setState({ loading: true });

      fetch("https://graphql.fauna.com/graphql", {
        method: "post",
        headers: {
          accept: "applicaton/json",
          "content-type": "applicaton/json",
          authorization: `Bearer ${FAUNA_PUBLIC_KEY}`,
        },
        body: JSON.stringify({
          query: `mutation ($email: String) {
  createMailingListEntry(data: { email: $email }) {
    _id
  }
}`,
          variables: {
            email,
          },
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.errors?.length > 0) {
            if (json.errors[0]?.extensions?.code === "instance not unique") {
              setState({ subscribed: true });
              callback?.(null);
              return;
            }
            const message = json.errors[0]?.message || genaricError;
            setState({
              error: message,
            });
            callback?.(message);
            return;
          }
          setState({ subscribed: true });
          callback?.(null);
        })
        .catch((error) => {
          const message = error?.message || genaricError;
          setState({ error: message });
          callback?.(message);
        });
    },
    [state, setState]
  );

  return [signup, state];
}

export default useMailingList;
