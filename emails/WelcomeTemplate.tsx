import {
  Link,
  Preview,
  Html,
  Body,
  Container,
  Text,
} from "@react-email/components";
import React from "react";

const WelcomeTemplate = () => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello Jp</Text>
          <Link href="https://facebook.com"> Open this link</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeTemplate;
