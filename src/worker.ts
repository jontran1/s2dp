import { pipeline, PipelineType, env, TranslationPipeline } from '@xenova/transformers';
import { GenerationConfigType } from '@xenova/transformers/types/utils/generation';
env.allowLocalModels = false;

interface ExtendedGenerationConfigType extends GenerationConfigType {
  tgt_lang: string;
  src_lang: string;
  callback_function: (x: { output_token_ids: number[] }[]) => void;
}

class MyTranslationPipeline {
  static task: PipelineType = 'translation';
  static model = 'Xenova/nllb-200-distilled-600M';
  static instance: TranslationPipeline | unknown;

  static async getInstance(progress_callback: (x: unknown) => void | undefined): Promise<TranslationPipeline> {
    if (!this.instance) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance as TranslationPipeline;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  // Retrieve the translation pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  const translator = await MyTranslationPipeline.getInstance((x: unknown) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  const configurations: ExtendedGenerationConfigType = {
    tgt_lang: event.data.tgt_lang,
    src_lang: event.data.src_lang,

    // Allows for partial output
    callback_function: (x: { output_token_ids: number[] }[]): void => {
      self.postMessage({
        status: 'update',
        output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
      });
    }
  }
  // Actually perform the translation
  const output = await translator(event.data.text, configurations);

  // Send the output back to the main thread
  self.postMessage({
    status: 'complete',
    output: output,
  });
});