import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { CONSTANTS } from "../../CONSTANTS";

interface IProps {
  error?: String | FetchBaseQueryError | SerializedError | undefined;
  showCode?: boolean;
}

export const ErrorFeedback: FC<IProps> = ({ error, showCode = false }) => {
  const [code, setCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof error === "string") {
      setMessage(error);
      return;
    }

    const parseErrorToSerializedError = error as SerializedError;
    if (
      parseErrorToSerializedError?.code &&
      parseErrorToSerializedError?.message
    ) {
      setCode(parseErrorToSerializedError.code);
      setMessage(parseErrorToSerializedError.message);
      return;
    }

    const parseErrorToFetchBaseQueryError = error as FetchBaseQueryError;

    if (
      !parseErrorToFetchBaseQueryError?.data &&
      !parseErrorToFetchBaseQueryError?.status
    ) {
      return;
    }
    const { status, data } = parseErrorToFetchBaseQueryError;
    const parseDataToAny = data as any;  

    if (status) setCode(status.toString());

    if (parseDataToAny.error) {
      setMessage(parseDataToAny.error ?? null);
    }
  }, [error]);

  return (
    <View style={code && message ? styles.container : {}}>
      {code || message ? (
        <Text style={styles.title}>
          {CONSTANTS.COMPONENTS.ERROR_FEEDBACK.ERROR_TITLE}
        </Text>
      ) : null}
      {code && showCode ? <Text style={styles.body}>Code: {code}</Text> : null}
      {message ? <Text style={styles.body}>Details: {message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingButton: 16,
  },
  title: {
    marginBottom: 4,
    color: "red",
  },
  body: {
    color: "#9d1919",
  },
});
