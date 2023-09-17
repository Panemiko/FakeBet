export function genPusherChannel(type: "room", discriminator: string) {
  return `${type}__${discriminator}`;
}
