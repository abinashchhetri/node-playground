import { Container } from "typedi";
import Logger from "./logger";

type DiPropsType = {
  name: string;
  model: any;
}[];

export default (props: DiPropsType) => {
  props.forEach(({ name, model }) => {
    Container.set(name, model);
  });

  Container.set("logger", Logger)
};
