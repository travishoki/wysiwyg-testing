/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { validateUrl } from "../../helpers/url"

export const LinkPlugin = () => {
  return <LexicalLinkPlugin validateUrl={validateUrl} />
}
