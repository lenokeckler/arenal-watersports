import type { NullableRef } from "@/app/types";

export interface E2eDockerContainer {
  Config: {
    Labels: NullableRef<Record<string, string>>;
  };
  Name: string;
  NetworkSettings: {
    Ports: Record<
      string,
      NullableRef<
        Array<{
          HostIp: string;
          HostPort: string;
        }>
      >
    >;
  };
}
