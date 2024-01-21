import MonsterAttribute from "./MonsterAttribute.ts";

type Monster = {
	name: string;
	description: string;
	image: string;
	attributes: MonsterAttribute;
}

export default Monster;