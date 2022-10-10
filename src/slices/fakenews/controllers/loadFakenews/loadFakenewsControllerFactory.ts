import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadFakenewsFactory } from "@/slices/fakenews/useCases";
import { LoadFakenewsController } from "@/slices/fakenews/controllers";

export const makeLoadFakenewsController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadFakenews",
    new LoadFakenewsController(
      makeValidationComposite(requiredFields),
      makeLoadFakenewsFactory()
    )
  );
};
