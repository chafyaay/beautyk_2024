import { State } from ".";
import { UserStateProps } from "../models";

export const selectUser = (state) => state.user as UserStateProps;
