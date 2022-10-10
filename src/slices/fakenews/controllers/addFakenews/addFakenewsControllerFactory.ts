import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddFakenewsFactory } from "@/slices/fakenews/useCases";
import { AddFakenewsController } from "@/slices/fakenews/controllers";

export const makeAddFakenewsController = (): Controller => {
  const requiredFields = ["sigiloDe100Anos"];
  return makeLogController(
    "addFakenews",
    new AddFakenewsController(
      makeValidationComposite(requiredFields),
      makeAddFakenewsFactory()
    )
  );
};
