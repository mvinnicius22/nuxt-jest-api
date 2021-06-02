import { mount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader";

describe("AppHeader", () => {
  test("if logged in is false, do not show logout button", () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.find("button").isVisible()).toBe(false);
  });

//   test("if logged in, show logout button", () => {
//     expect(true).toBe(false);
//   });
});
