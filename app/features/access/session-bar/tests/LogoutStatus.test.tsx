import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { STRING } from "@/app/constants";
import LogoutStatus from "../components/LogoutStatus";
import { STATUS_MESSAGE } from "./LogoutButton.constants";
import { createLogoutStatusPage } from "./LogoutStatus.page";

describe("LogoutStatus", () => {
  it("shows the message it is given in a status region", () => {
    render(<LogoutStatus message={STATUS_MESSAGE} />);
    const page = createLogoutStatusPage();

    expect(page.getStatus()).toHaveTextContent(
      STATUS_MESSAGE
    );
  });

  it("stays mounted and empty when the message is empty", () => {
    render(<LogoutStatus message={STRING.Empty} />);
    const page = createLogoutStatusPage();

    expect(page.getStatus()).toBeEmptyDOMElement();
  });
});
