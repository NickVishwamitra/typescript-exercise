import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "isomorphic-unfetch";

import App from "../../pages/deliverable2";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        coord: {
          lon: -74.006,
          lat: 40.7143,
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n",
          },
        ],
        base: "stations",
        main: {
          temp: 299.65,
          feels_like: 299.65,
          temp_min: 297.64,
          temp_max: 300.9,
          pressure: 1018,
          humidity: 77,
        },
        visibility: 10000,
        wind: {
          speed: 4.12,
          deg: 250,
        },
        clouds: {
          all: 20,
        },
        dt: 1659943532,
        sys: {
          type: 2,
          id: 2039034,
          country: "US",
          sunrise: 1659952768,
          sunset: 1660003436,
        },
        timezone: -14400,
        id: 5128581,
        name: "New York",
        cod: 200,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows weather results", async () => {
  render(<App />);
  // todo: write some assertions
  const weatherInput = screen.getByLabelText(
    "Weather Search:"
  ) as HTMLInputElement;
  userEvent.type(weatherInput, "New York");
  userEvent.click(screen.getByRole("button", { name: "SUBMIT" }));
  await waitFor(() => {
    expect(screen.getByText("New York".toUpperCase()));
    expect(screen.getAllByAltText(/weather icon/i));
  });
});

test("it shows error when city is invalid", async () => {
  server.use(
    rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
      return res(
        ctx.json({
          cod: "404",
          message: "city not found",
        })
      );
    })
  );

  render(<App />);
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  const weatherInput = screen.getByLabelText(
    "Weather Search:"
  ) as HTMLInputElement;
  userEvent.type(weatherInput, "FDASWESFE");
  userEvent.click(screen.getByRole("button", { name: "SUBMIT" }));
  await waitFor(() => {
    expect(alertMock).toBeCalled();
  });
});
