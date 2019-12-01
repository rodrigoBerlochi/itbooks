#include <jsi/jsi.h>
#include <jni.h>
#include <random>

#include "ItBooksJSIInstaller.h"

JavaVM *jvm;

struct EventHandlerWrapper
{
  EventHandlerWrapper(jsi::Function eventHandler)
      : callback(std::move(eventHandler)) {}

  jsi::Function callback;
};

extern "C" JNIEXPORT void JNICALL
Java_com_itbooks_ItBooksJSIInstaller_installBinding(JNIEnv *env, jobject thiz, jlong runtimePtr)
{
  auto &runtime = *(jsi::Runtime *)runtimePtr;
  auto itBooksBinding = std::make_shared<ItBooksModule>();

  ItBooksModule::install(runtime, itBooksBinding);

  env->GetJavaVM(&jvm);
}

JNIEnv *attachCurrentThread()
{
  JavaVMAttachArgs args{JNI_VERSION_1_6, nullptr, nullptr};
  JNIEnv *env = nullptr;
  auto result = jvm->AttachCurrentThread(&env, &args);
  return env;
}

void ItBooksModule::install(
    jsi::Runtime &runtime,
    const std::shared_ptr<ItBooksModule> itBooksModule)
{
  auto itBooksModuleName = "NativeItBooksModule";
  auto object = jsi::Object::createFromHostObject(runtime, itBooksModule);

  runtime.global().setProperty(runtime, itBooksModuleName, std::move(object));
}

jsi::Value ItBooksModule::get(
    jsi::Runtime &runtime,
    const jsi::PropNameID &name)
{
  auto methodName = name.utf8(runtime);

  // if (methodName == "getBooks")
  // {
  //   return jsi::Function::createFromHostFunction(
  //       runtime,
  //       name,
  //       1,
  //       [](
  //           jsi::Runtime &runtime,
  //           const jsi::Value &thisValue,
  //           const jsi::Value *arguments,
  //           size_t count) -> jsi::Value {
  //         auto env = attachCurrentThread();

  //         auto clazz = env->FindClass("com/itbooks/ItBooksJSIInstaller");

  //         auto page = &arguments[0];

  //         auto runFetchQueueBooks = env->GetStaticMethodID(clazz, "fetchQueueBooks",
  //                                                          "(I)Ljava/lang/String;");
  //         auto str = (jstring)env->CallStaticObjectMethod(clazz, runFetchQueueBooks,
  //                                                         page->asNumber());

  //         const char *cStr = env->GetStringUTFChars(str, nullptr);

  //         return jsi::String::createFromAscii(runtime, cStr);
  //       });
  // }

  if (methodName == "getBooks")
  {
    return jsi::Function::createFromHostFunction(
        runtime,
        name,
        2,
        [](
            jsi::Runtime &runtime,
            const jsi::Value &thisValue,
            const jsi::Value *arguments,
            size_t count) -> jsi::Value {
          auto env = attachCurrentThread();
          auto page = &arguments[0];
          auto fn = arguments[1].getObject(runtime).asFunction(runtime);
          auto eventhandler =
              std::make_shared<EventHandlerWrapper>(std::move(fn));
          auto clazz = env->FindClass("com/itbooks/ItBooksJSIInstaller");

          auto runFetchQueueBooks = env->GetStaticMethodID(clazz, "fetchQueueBooks",
                                                           "(I)Ljava/lang/String;");

          auto str = (jstring)env->CallStaticObjectMethod(clazz, runFetchQueueBooks,
                                                          page->asNumber());

          const char *cStr = env->GetStringUTFChars(str, nullptr);
          auto to_return = jsi::String::createFromAscii(runtime, cStr);

          eventhandler->callback.call(runtime, to_return);

          return jsi::Value::undefined();
        });
  }

  return jsi::Value::undefined();
}
