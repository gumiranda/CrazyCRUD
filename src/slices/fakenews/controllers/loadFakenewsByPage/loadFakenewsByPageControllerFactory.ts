import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadFakenewsByPageFactory } from "@/slices/fakenews/useCases";
import { LoadFakenewsByPageController } from "@/slices/fakenews/controllers";

export const makeLoadFakenewsByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadFakenewsByPage",
    new LoadFakenewsByPageController(
      makeValidationComposite(requiredFields),
      makeLoadFakenewsByPageFactory()
    )
  );
};
