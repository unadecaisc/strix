import { navigation, type LinkType } from "../../stores/navigation.store";

export function updateNavigation(
  node: HTMLElement,
  { title }: { title: string },
  link: LinkType,
) {
  console.log(node);
  navigation.update((n) => {
    n = [];
    n.push(link);
    const exist = n.filter((item) => item.title !== title);
    if (exist.length === n.length) {
      n.push({ title, path: "" });
    }
    return n;
  });
}
