import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteFakenewsFactory } from "@/slices/fakenews/useCases";
import { DeleteFakenewsController } from "@/slices/fakenews/controllers";

export const makeDeleteFakenewsController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteFakenews",
    new DeleteFakenewsController(
      makeValidationComposite(requiredFields),
      makeDeleteFakenewsFactory()
    )
  );
};
