import TestModuleTypes from "./modules/test/interface";

export default interface RootStateTypes {
    test: string
}

export interface AllStateTypes extends RootStateTypes {
    testModule: TestModuleTypes
}